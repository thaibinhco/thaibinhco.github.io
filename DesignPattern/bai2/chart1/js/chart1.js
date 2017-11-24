var myData = {
    values: [80, 20],
    info: ["ĐÃ ĐẠT", "CHƯA ĐẠT"],
};

var setting = {
    color: ["#6382bf", "#e6655b", "#e42a1d", "#00BCD4"],
    height: 100,
    space: 30,
    lineColor: ["#6382bf", "#e6655b"],
    widthLine: 5,
    radius: 0.7,
};

var pieChart = (function() {
    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");
    canvas.height = 500;
    canvas.width = 800;
    var data = [];
    var myInfo = [];
    var arrValue = myData.values;
    
    function sortInfo(info1, info2) {
          return info2.val - info1.val;
    }
    function infoValue(val, info) {
        this.val = val;
        this.info = info;
        this.toString = function() {
            return this.info;
        };
    }
    var arrInfo = [];
    for (var i = 0; i < myData.values.length; i++) {
        arrInfo.push(new infoValue(myData.values[i], myData.info[i]));
    }
    arrInfo.sort(sortInfo);
    for (var i in arrInfo) {
        myInfo.push(arrInfo[i].info);
        data.push(arrInfo[i].val);
    }
    
    var color = setting.color;
    var total = 0;
    var lastEnd = 0;
		
    var x = canvas.width / 2;
    var y = canvas.height;
    var r = Math.min(canvas.width / 2, canvas.height / 2) * setting.radius;
    var scaleX = 0.9;
    var scaleY = 0.4;
    ctx.scale(scaleX, scaleY);
    var lastPoint;
    var space = setting.space;
		
    for (var i in data) {
        var tmp = parseInt(data[i]);
        total += tmp;
    }

    function drawPie(height) {
        ctx.fillStyle = "black";
        var slice;
        for (var i in data) {
            slice = Math.PI * 2 * (data[i] / total);
            if (i != 0) {
                ctx.fillStyle = color[i];
                if (height >= setting.height - 1) {
                    ctx.fillStyle = color[color.length - 1 - i];
                }
                ctx.beginPath();

                if (slice < 50) {
                    ctx.moveTo(x + space, y - height - space);
                    ctx.arc(x + space, y - height - space, r - 15, lastEnd, lastEnd + slice);
                    ctx.lineTo(x, y - height - space);
                }
                
                if (slice >= 50) {
                    ctx.moveTo(x, y);
                    ctx.arc(x, y, r, lastEnd, lastEnd + slice);
                    ctx.lineTo(x, y);
                }
                ctx.fill();
                lastEnd += Math.PI * 2 * (data[i] / total);
            }
            if (i == 0) {
                ctx.fillStyle = color[i];
                if (height >= setting.height - 1) {
                    ctx.fillStyle = color[color.length - 1 - i];
                }
                ctx.beginPath();
                ctx.moveTo(x , y - height);
                ctx.arc(x, y - height, r, lastEnd, lastEnd + (Math.PI * 2 * (data[i] / total)));
                ctx.lineTo(x, y - height);
                ctx.fill();
                lastEnd += Math.PI * 2 * (data[i] / total);
            }
        }
    }
		
    function drawPie() {
        for (var height = 0; height < setting.height; height++) {
            drawPie(height);
            if (height == 100 - 1) {
                drawDescription();
            }
        }
    }
    
    function drawDescription() {
        lastPoint = lastEnd;
        var heightLine = 150;
        var widthLine = 50;
        for (var i in data) {
            var slice = 3 * Math.PI * (data[i] / total);
						
            var pX = x + r / 1.3 * Math.cos(lastPoint + slice / 2);
            var pY = y - setting.height + r / 1.4 * Math.sin(lastPoint + slice / 2);
            ctx.font = "28px arial";
            ctx.fillStyle = "black";
            var info = data[i] * 100 / total;
            
            ctx.beginPath();
            ctx.lineWidth = setting.widthLine;
            heightLine = heightLine + info * 1.2;
						
            if (info >= 50) {
                ctx.strokeStyle = setting.lineColor[i];
                ctx.moveTo(pX - widthLine * 2, pY - heightLine + data[i]);
                ctx.lineTo(pX - widthLine * 4, pY - heightLine + data[i]);
                ctx.moveTo(pX, pY);
                ctx.lineTo(pX - widthLine * 2, pY - heightLine + data[i]);
                ctx.stroke();
                ctx.fillText(info + "%" + " " + myInfo[i], pX - widthLine * 4.5, pY - heightLine - 25 + data[i]);
            } else {
                ctx.strokeStyle = setting.lineColor[i];
                ctx.moveTo(pX + widthLine * 2, pY - heightLine + data[i]);
                ctx.lineTo(pX + widthLine * 4, pY - heightLine + data[i]);
                ctx.moveTo(pX, pY);
                ctx.lineTo(pX + widthLine * 2, pY - heightLine + data[i]);
                ctx.stroke();
                ctx.fillText(info + "%" + " " + myInfo[i], pX + widthLine * 2, pY - heightLine - 25 + data[i]);
            }
            lastPoint += (data[i] / total) * Math.PI * 2;
        }
    }
    
    return {
        drawPie: drawPie,
    }
})();

$(document).ready(function() {
    pieChart.drawPie();
});