//Functions
{
    var _0x8fb5 = ["onload", "length", "result", "target", "src", "attr", "width", "height", "left", "px", "css", "unizap_JSImageText", "unizap_RecordGUID", "unizap_EntityName", "", "readAsDataURL", "/", "?", "unizap_ImageText,unizap_quickpicdataId", "unizap_RecordGUID eq \x27", "\x27 and unizap_EntityName eq \x27", "\x27", "$select = ", "\x26$filter = ", "GET", "application/json; charset=utf-8", "json", "Accept", "application/json", "setRequestHeader", "results", "d", "unizap_ImageText", "unizap_quickpicdataId", "OData Retrieve Failed: ", " ; Error – ", "responseText", "ajax"]
    function SetPicture(_0xc7cfx2) {
        var _0xc7cfx3 = $(divImgPreview);
        var _0xc7cfx4;
        try {
            _0xc7cfx4 = new FileReader();
        }
        catch (err) {
            alert(HTML5AlertMsg);
            return;
        }
        _0xc7cfx4[_0x8fb5[0]] = function (_0xc7cfx5) {
            if (_0xc7cfx5[_0x8fb5[3]][_0x8fb5[2]][_0x8fb5[1]] > max_file_size) {
                alert(FileSizeBigMsg);
                return;
            }
            _0xc7cfx3[_0x8fb5[5]](_0x8fb5[4], _0xc7cfx5[_0x8fb5[3]][_0x8fb5[2]]);
            _0xc7cfx3[_0x8fb5[5]](_0x8fb5[6], imageWidth);
            _0xc7cfx3[_0x8fb5[5]](_0x8fb5[7], height);
            $(divImage)[_0x8fb5[10]](_0x8fb5[8], imageLeftPosition + _0x8fb5[9]);
            var _0xc7cfx6 = new Object();
            _0xc7cfx6[_0x8fb5[11]] = _0xc7cfx5[_0x8fb5[3]][_0x8fb5[2]];
            _0xc7cfx6[_0x8fb5[12]] = RecordID;
            _0xc7cfx6[_0x8fb5[13]] = EntityName;
            if (QuickPicDataId == _0x8fb5[14] || QuickPicDataId == null) {
                createRecord(_0xc7cfx6);
            }
            else {
                updateRecord(QuickPicDataId, _0xc7cfx6);
            }
            toggleFileSelect();
        }
	;
        _0xc7cfx4[_0x8fb5[15]](_0xc7cfx2[0]);
    }
    ;
    function RetreiveImageURL() {
        var _0xc7cfx8 = ODATA_URL + _0x8fb5[16] + ODATA_QUICKPICKDATA + _0x8fb5[17];
        var _0xc7cfx9 = _0x8fb5[18];
        var _0xc7cfxa = _0x8fb5[19] + RecordID + _0x8fb5[20] + EntityName + _0x8fb5[21];
        _0xc7cfx8 += _0x8fb5[22] + _0xc7cfx9;
        _0xc7cfx8 += _0x8fb5[23] + _0xc7cfxa;
        $[_0x8fb5[37]]({ async: false, type: _0x8fb5[24], contentType: _0x8fb5[25], datatype: _0x8fb5[26], url: _0xc7cfx8, beforeSend: function (_0xc7cfxb) {
            _0xc7cfxb[_0x8fb5[29]](_0x8fb5[27], _0x8fb5[28]);
        }
	, success: function (_0xc7cfxc, _0xc7cfxd, _0xc7cfxe) {
	    if (_0xc7cfxc[_0x8fb5[31]][_0x8fb5[30]] != null && _0xc7cfxc[_0x8fb5[31]][_0x8fb5[30]][_0x8fb5[1]] > 0) {
	        ImageText = _0xc7cfxc[_0x8fb5[31]][_0x8fb5[30]][0][_0x8fb5[32]];
	        QuickPicDataId = _0xc7cfxc[_0x8fb5[31]][_0x8fb5[30]][0][_0x8fb5[33]];
	    }
	}
	, error: function (_0xc7cfxe, _0xc7cfxd, _0xc7cfxf) {
	    alert(_0x8fb5[34] + _0xc7cfx8 + _0x8fb5[35] + _0xc7cfxe[_0x8fb5[36]]);
	}
        });
    }
    ;
}