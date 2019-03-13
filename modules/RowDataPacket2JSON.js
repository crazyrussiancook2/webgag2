function RowDataPacket2JSON (data){
    var str=JSON.stringify(data);
    var JSONobj=JSON.parse(str);
    return JSONobj;
};

module.exports = RowDataPacket2JSON;