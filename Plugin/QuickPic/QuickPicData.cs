using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace Clapter.QuickPic.Plugin
{
    public class QuickPicData : IPlugin
    {
        private IOrganizationService callingUserService;
        private IOrganizationService systemUserService;

        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            if (context.PrimaryEntityName == "clapter_quickpicdata")
            {
                IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                callingUserService = factory.CreateOrganizationService(context.InitiatingUserId);
                systemUserService = factory.CreateOrganizationService(null);

                string _errMsg = "";

                try
                {
                    if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
                    {
                        // Obtain the target entity from the input parmameters
                        Entity targetEntity = (Entity)context.InputParameters["Target"];

                        if (context.Mode == (int)Constants.PluginInfo.ModeValue.Synchronous)//synchronous
                        {
                            if ((context.MessageName == Constants.PluginInfo.MessageCreate || context.MessageName == Constants.PluginInfo.MessageUpdate) && context.Stage == (int)Constants.PluginInfo.StageValues.PreOperation)
                            {
                                if (_isTrialExpired("QuickPic", 1))
                                {
                                    targetEntity["clapter_imagetext"] = "Trial Period Expired.";
                                }
                            }
                        }
                    }
                }

                catch (InvalidPluginExecutionException ex)
                {
                    throw ex;
                }
                catch (Exception ex)
                {
                    _errMsg = "ERROR in QuickPicData Plug-in: ";
                    _errMsg += ex.Message;

                    throw new InvalidPluginExecutionException(_errMsg, ex);
                }
            }
        }

        public bool _isTrialExpired(string Addon, int TrialDays)
        {
            QueryExpression qe = new QueryExpression();
            qe.EntityName = "solution";
            qe.ColumnSet = new ColumnSet() { AllColumns = true };
            ConditionExpression ce = new ConditionExpression();

            ce.AttributeName = "uniquename";
            ce.Operator = ConditionOperator.Equal;
            ce.Values.Add(Addon);
            FilterExpression fe = new FilterExpression();
            fe.Conditions.Add(ce);
            qe.Criteria = fe;
            EntityCollection retrievedRecords = systemUserService.RetrieveMultiple(qe);

            if (retrievedRecords.Entities.Count <= 0)
            {
                throw new SystemException("Could not find add-on solution or solution names mis-match.");
            }
            else
            {
                Entity solution = (Entity)retrievedRecords.Entities[0];
                DateTime installDate = solution.GetAttributeValue<DateTime>("installedon");
                if (installDate.ToUniversalTime().AddDays(TrialDays) >= DateTime.Today.ToUniversalTime())
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
    }
}