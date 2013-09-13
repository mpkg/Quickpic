function SetPicture(files) {
    var image = $(divImgPreview);
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
        image.attr('src', e.target.result);
        image.attr('width', imageWidth);
        image.attr('height', height);
        $(divImage).css('left', imageLeftPosition + 'px');
        var quickPicData = new Object();
        quickPicData.unizap_JSImageText = e.target.result;
        quickPicData.unizap_RecordGUID = RecordID;
        quickPicData.unizap_EntityName = EntityName;
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
    var select = "unizap_ImageText,unizap_quickpicdataId";
    var filter = "unizap_RecordGUID eq '" + RecordID + "' and unizap_EntityName eq '" + EntityName + "'";
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
                ImageText = data.d.results[0].unizap_ImageText;
                QuickPicDataId = data.d.results[0].unizap_quickpicdataId;
            }
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert('OData Retrieve Failed: ' + odataUri + " ; Error – " + XmlHttpRequest.responseText);
        }
    });
}