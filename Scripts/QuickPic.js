//Constants & variables
{
    var XrmObject = window.parent.Xrm;
    var ODATA_URL = XrmObject.Page.context.prependOrgName('/XRMServices/2011/OrganizationData.svc');
    var ODATA_QUICKPICKDATA = 'unizap_quickpicdataSet';
    var divImage = '#divImage';
    var divFileSelect = '#divFileSelect';
    var divQuickPic = '#divQuickPic';
    var tblQuickPic = '#tblQuickPic';
    var imgPreview = '#imgPreview';
    var fileUpload = '#iptFile';
    var btnAdd = '#imgAdd';
    var btnDelete = '#imgDelete';
    var browseButtons = '.browse';
    var leftButton = '#btnLeft';
    var rightButton = '#btnRight';
    var max_file_size = 1048576;
    var placeholderSrc = 'data:image/png;base64,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';
    var HTML5AlertMsg = 'Your Browser does not support HTML5 uploads! Cannot show preview!';
    var FileSizeBigMsg = 'File size is too big!';
    var clientWidth = $(window).width();
    var clientHeight = $(window).height();
    var imageWidth = clientWidth * 3 / 5;
    var imageLeftPosition = clientWidth * 1 / 5;
    var fileControlLeftPosition = clientWidth * 2 / 5;
    var images = new Array();
    var RecordID = XrmObject.Page.data.entity.getId();
    var EntityName = XrmObject.Page.data.entity.getEntityName();
    var displayPictureIndex = 0;
}

//Functions
{
    function attachEvents() {
        $(window).resize(function () {
            clientWidth = $(window).width();
            clientHeight = $(window).height();
            imageWidth = clientWidth * 3 / 5;
            imageLeftPosition = clientWidth * 1 / 5;
            fileControlLeftPosition = clientWidth * 2 / 5;
            initializeUI();
            $(imgPreview).attr('width', imageWidth);
            $(imgPreview).attr('height', clientHeight);
        });
        $(btnAdd).click(function () { $(fileUpload).trigger('click'); });
        $(btnDelete).click(deletePicture);
        $(browseButtons).click(browse);
    }

    function initializeUI() {
        ConfigureAjaxLoading('Processing...');

        $(divQuickPic).width(imageWidth);

        $(divImage).css('position', 'fixed')
                   .css('left', imageLeftPosition + 'px')
                   .css('top', '0px');
        $(divFileSelect).css('position', 'fixed')
                        .css('left', fileControlLeftPosition + 'px')
                        .css('top', (clientHeight - 0.25 * clientHeight) + 'px')
                        .hide();
        $(browseButtons).hide();
        $(leftButton).css("position", "fixed")
                     .css("top", (clientHeight / 2.5) + "px")
                     .css("left", (fileControlLeftPosition / 5 + "px"));
        $(rightButton).css("position", "fixed")
                     .css("top", (clientHeight / 2.5) + "px")
                     .css("right", (fileControlLeftPosition / 5 + "px"));
    }

    function loadPicture(index) {
        displayPictureIndex = index;
        retreivePictures(EntityName, RecordID);
        if (images.length == 0) {
            displayPicture(placeholderSrc); //display placeholder
        }
        else if (images.length == 1) {
            displayPicture(images[0].unizap_ImageText);
        }
        else if (images.length > 1) {
            displayPicture(images[index].unizap_ImageText);
        }
        toggleBrowseVisibility();
        toggleFileSelect();
    }

    function retreivePictures(entityName, recordId) {
        var odataUri = ODATA_URL + "/" + ODATA_QUICKPICKDATA + "?";
        var select = "unizap_ImageText,unizap_quickpicdataId,unizap_ImageNo,unizap_FacebookProfileURL";
        var filter = "unizap_RecordGUID eq '" + recordId + "' and unizap_EntityName eq '" + entityName + "'";
        odataUri += "$select = " + select;
        odataUri += "&$filter = " + filter;
        $.ajax({
            async: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: odataUri,
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON.
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function (data, textStatus, XmlHttpRequest) {
                if (data.d.results != null) {
                    images = data.d.results;
                }
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                alert('OData Retrieve Failed: ' + odataUri + " ; Error – " + XmlHttpRequest.responseText);
            }
        });
    }

    function displayPicture(imageSrc) {
        $(imgPreview).attr('src', imageSrc);
        $(imgPreview).attr('width', imageWidth);
        $(imgPreview).attr('height', clientHeight);
    }

    function toggleBrowseVisibility() {
        $(browseButtons).hide();
        $('body').mouseenter(function () {
            if (images.length > 1) {
                $(browseButtons).fadeIn();
            }
        }).mouseleave(function () {
            $(browseButtons).fadeOut();
        });
    }

    function toggleFileSelect() {
        $(divFileSelect).hide();
        $(divQuickPic).mouseenter(function () {
            $(divFileSelect).fadeIn();
        }).mouseleave(function () {
            $(divFileSelect).fadeOut();
        });
    }

    function addPicture(files) {
        var reader;
        try {
            reader = new FileReader();
        } catch (err) {
            alert(HTML5AlertMsg);
            return;
        }

        reader.onload = function (e) {
            // e.target.result holds the DataURL which
            // can be used as a source of the image:
            if (e.target.result.length > max_file_size) {
                alert(FileSizeBigMsg);
                return;
            }
            var quickPicData = new Object();
            quickPicData.unizap_JSImageText = e.target.result;
            quickPicData.unizap_RecordGUID = RecordID;
            quickPicData.unizap_EntityName = EntityName;
            try {
                createRecord(quickPicData);
            }
            catch (e) {
            }
        };

        // Reading the file as a DataURL. When finished,
        // this will trigger the onload function above:
        reader.readAsDataURL(files[0]);
    }

    function deletePicture() {
        try {
            deleteRecord(images[displayPictureIndex].unizap_quickpicdataId);
        }
        catch (e) {
        }
    }

    function browse() {
        try {
            if (this.id == 'divBtnLeft') {
                displayPictureIndex--;
                if (displayPictureIndex < 0)
                    displayPictureIndex = images.length - 1;
                displayPicture(images[displayPictureIndex].unizap_ImageText);
            }
            else if (this.id == 'divBtnRight') {
                displayPictureIndex++;
                if (displayPictureIndex >= images.length)
                    displayPictureIndex = 0;
                displayPicture(images[displayPictureIndex].unizap_ImageText);
            }
        } catch (e) {
        }
    }

    function deleteRecord(id) {
        $.ajax({
            async: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: ODATA_URL + "/" + ODATA_QUICKPICKDATA + "(guid'" + id + "')",
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON.
                XMLHttpRequest.setRequestHeader("Accept", "application/json");

                //Specify the HTTP method MERGE to update just the changes you are submitting.
                XMLHttpRequest.setRequestHeader("X-HTTP-Method", "DELETE");
            },

            success: function (data, textStatus, XmlHttpRequest) {
                loadPicture(images.length - 2);
            },

            error: function (XmlHttpRequest, textStatus, errorThrown) {
                if (XmlHttpRequest && XmlHttpRequest.responseText) {
                    alert("Error while updating " + ODATA_QUICKPICKDATA + " ; Error – " + XmlHttpRequest.responseText);
                }
            }
        });
    }

    function createRecord(entityObject) {
        var jsonEntity = window.JSON.stringify(entityObject);

        //synchronous AJAX function to Update a CRM record using OData

        $.ajax({
            async: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: jsonEntity,
            url: ODATA_URL + "/" + ODATA_QUICKPICKDATA,
            beforeSend: function (XMLHttpRequest) {
                //Specifying this header ensures that the results will be returned as JSON.
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },

            success: function (data, textStatus, XmlHttpRequest) {
                if (data != null && data.d != null && data.d.unizap_quickpicdataId != null) {
                    loadPicture(images.length);
                }
            },

            error: function (XmlHttpRequest, textStatus, errorThrown) {
                if (XmlHttpRequest && XmlHttpRequest.responseText) {
                    alert("Error while updating " + ODATA_QUICKPICKDATA + " ; Error – " + XmlHttpRequest.responseText);
                }
            }
        });
    }

    function ConfigureAjaxLoading(text) {
        jQuery.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
            this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
            return this;
        }
        $('body').append('<div id="loadingDiv"></div>');
        $('#loadingDiv').css('background', 'url(/_imgs/AdvFind/progress.gif) no-repeat center')
                    .css('height', clientHeight + 'px')
                    .css('width', imageWidth + 'px')
                    .center()
                    .hide()  // hide it initially
                    .ajaxStart(function () {
                        $(this).show();
                    })
                    .ajaxStop(function () {
                        $(this).hide();
                    });
    }
}