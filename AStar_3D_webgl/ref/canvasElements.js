var canvasElements = {
  
    drawCurlybrush: function(ctx, _x, _y, R, G, B, A, pointX, pointY, _weightRandom) {
        var weightRandom = Math.random() * _weightRandom;
        var loc2 = Utils.addVectors({ x: -pointX * 0.7, y: pointY }, { x: _x, y: _y });
        var loc4 = Utils.addVectors({ x: pointX, y: pointY }, { x: _x, y: _y });
        var loc3 = Utils.addVectors({ x: pointX * 0.7, y: -pointY }, { x: _x, y: _y });
        ctx.save();
        ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + A + ')';
        ctx.beginPath();
        ctx.moveTo(_x, _y);
        ctx.lineWidth = weightRandom;
        ctx.bezierCurveTo(loc2.x, loc2.y, loc3.x, loc3.y, loc4.x, loc4.y);
        ctx.stroke();
        ctx.restore();
    },
    drawFacebrush: function(ctx, _x, _y, R, G, B, pointX, pointY, _lengthRandom, alpha, _weightRandom) {
        var weightRandom = Math.random() * 2;
          var lengthRandomX = Utils.getRandomArbitrary(-_lengthRandom, _lengthRandom);
        var lengthRandomY = Utils.getRandomArbitrary(-_lengthRandom, _lengthRandom);
        pointX = _x + pointX + lengthRandomX;
        pointY = _y + pointY + lengthRandomY;
        ctx.save();
        ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + alpha + ')';
        ctx.beginPath();
        ctx.moveTo(_x, _y);
        ctx.lineWidth = _weightRandom+weightRandom;
        ctx.lineCap = "round";
        ctx.lineTo(pointX, pointY);
        ctx.stroke();
        ctx.restore();
    },
    drawBrush: function(ctx, _x, _y, R, G, B, pointX, pointY, _lengthRandom, alpha, _weightRandom) {
        var weightRandom = Math.random() * _weightRandom;
        var lengthRandom = Utils.getRandomArbitrary(-_lengthRandom, _lengthRandom);

        pointX = _x + pointX + lengthRandom;
        pointY = _y + pointY + lengthRandom;
        ctx.save();
        ctx.strokeStyle = 'rgb(' + R + ',' + G + ',' + B + ')';
        ctx.beginPath();
        ctx.moveTo(_x, _y);
        ctx.lineWidth = weightRandom;
        ctx.lineCap = "round";
        ctx.lineTo(pointX, pointY);
        ctx.stroke();
        ctx.restore();
    },
    drawEllipse: function(aContext, centerX, centerY, majorRadiusLength, minorRadiusLength, rotationAngle, fillR, fillG, fillB, strokeWeight) {
        aContext.save();
        aContext.fillStyle = 'rgb(' + fillR + ',' + fillG + ',' + fillB + ')';
        //aContext.strokeStyle = 'rgb(' + (fillR-10) + ',' + (fillG-10) + ',' + (fillB-10) + ')';
        aContext.strokeStyle = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
        aContext.beginPath();
        aContext.lineWidth =0.1;
        aContext.ellipse(centerX, centerY, minorRadiusLength, majorRadiusLength, rotationAngle, 0, 2 * Math.PI);
        aContext.fill();
        // aContext.stroke();
        aContext.restore();
    }
}
