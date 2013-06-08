﻿﻿
function LoadImage() {
    RetreiveImageURL();
    var image = $('#imgPreview');
    if (ImageText != '') {
        image.attr('src', ImageText);
    }
    else {
        image.attr('src', Alt_ImageText);
    }
    image.attr('width', width * 3 / 5);
    image.attr('height', height);
    $('#divImage').css('left', width * 1 / 5 + 'px');
    ToggleFileSelect();
}

function SetPicture(files) {
    var image = $('#imgPreview');
    var reader;
    try {
        reader = new FileReader();
    } catch (err) {
        alert('Your Browser does not support HTML5 uploads! Cannot show preview!');
        return;
    }

    reader.onload = function (e) {
        // e.target.result holds the DataURL which
        // can be used as a source of the image:
        if (e.target.result.length > max_file_size) {
            alert('File size is too big!');
            return;
        }
        image.attr('src', e.target.result);
        image.attr('width', width * 3 / 5);
        image.attr('height', height);
        $('#divImage').css('left', width * 1 / 5 + 'px');
        var quickPicData = new Object();
        quickPicData.clapter_ImageText = e.target.result;
        quickPicData.clapter_RecordGUID = RecordID;
        quickPicData.clapter_EntityTypeCode = parseInt(ETC);
        quickPicData.clapter_EntityName = EntityName;
        if (QuickPicDataId == '' || QuickPicDataId == null) {
            CreateRecord(quickPicData);
        }
        else {
            UpdateRecord(QuickPicDataId, quickPicData);
        }
        ToggleFileSelect();
    };

    // Reading the file as a DataURL. When finished,
    // this will trigger the onload function above:
    reader.readAsDataURL(files[0]);
}

function RetreiveImageURL() {
    var odataUri = ODATA_URL + "/" + ODATA_QUICKPICKDATA + "?";
    var select = "clapter_ImageText,clapter_quickpicdataId";
    var filter = "clapter_RecordGUID eq '" + RecordID + "' and clapter_EntityTypeCode eq " + parseInt(ETC);
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
            if (data.d.results != null && data.d.results.length > 0) {
                ImageText = data.d.results[0].clapter_ImageText;
                QuickPicDataId = data.d.results[0].clapter_quickpicdataId;
            }
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert('OData Retrieve Failed: ' + odataUri + " ; Error – " + XmlHttpRequest.responseText);
        }
    });
}

function ToggleFileSelect() {
    $('#divFileSelect').hide();
    $("#imgPreview").hover(
	  function () {
	      $('#divFileSelect').fadeIn();
	  },
	  function () {
	      $('#divFileSelect').delay(1000).fadeOut();
	  }
	);
}

function UpdateRecord(id, entityObject) {
    var jsonEntity = window.JSON.stringify(entityObject);

    //synchronous AJAX function to Update a CRM record using OData

    $.ajax({
        async: true,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data: jsonEntity,
        url: ODATA_URL + "/" + ODATA_QUICKPICKDATA + "(guid'" + id + "')",
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");

            //Specify the HTTP method MERGE to update just the changes you are submitting.
            XMLHttpRequest.setRequestHeader("X-HTTP-Method", "MERGE");
        },

        success: function (data, textStatus, XmlHttpRequest) {
        },

        error: function (XmlHttpRequest, textStatus, errorThrown) {
            if (XmlHttpRequest && XmlHttpRequest.responseText) {
                alert("Error while updating " + ODATA_QUICKPICKDATA + " ; Error – " + XmlHttpRequest.responseText);
            }
        }
    });
}

function CreateRecord(entityObject) {
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
            if (data != null && data.d != null && data.d.clapter_quickpicdataId != null) {
                QuickPicDataId = data.d.clapter_quickpicdataId;
            }
        },

        error: function (XmlHttpRequest, textStatus, errorThrown) {
            if (XmlHttpRequest && XmlHttpRequest.responseText) {
                alert("Error while updating " + ODATA_QUICKPICKDATA + " ; Error – " + XmlHttpRequest.responseText);
            }
        }
    });
}