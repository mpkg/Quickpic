//a
{
    displayPicture(images[0].unizap_ImageText);
}

//b
{
    displayPicture(images[index].unizap_ImageText);
}

//c
{
    displayPicture(images[displayPictureIndex].unizap_ImageText);
}

//d
{
    var quickPicData = new Object();
    quickPicData.unizap_JSImageText = e.target.result;
    quickPicData.unizap_RecordGUID = RecordID;
    quickPicData.unizap_EntityName = EntityName;
    try {
        createRecord(quickPicData);
    }
    catch (e) {
    }
}  