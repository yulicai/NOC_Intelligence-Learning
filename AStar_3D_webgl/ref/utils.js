var Utils = {
    distanceBetween2DPoints: function(point1X, point1Y, point2X, point2Y) {
        return Math.sqrt(Math.pow(point2X - point1X, 2) + Math.pow(point2Y - point1Y, 2));
    },
    distanceBetween3DPoints: function(point1X, point1Y, point1Z, point2X, point2Y, point2Z) {
        return Math.sqrt(Math.pow(point2X - point1X, 2) + Math.pow(point2Y - point1Y, 2) + Math.pow(point2Z - point1Z, 2));
    },
    addVectors: function(vec1, vec2) {
        var vec3 = {};
        vec3.x = vec1.x + vec2.x;
        vec3.y = vec1.y + vec2.y;
        if (vec1.z != undefined && vec2.z != undefined) vec3.z = vec1.z + vec2.z;
        return vec3;
    },
    subVectors: function(vec1, vec2) {
        var vec3 = {};
        vec3.x = vec1.x - vec2.x;
        vec3.y = vec1.y - vec2.y;
        if (vec1.z != undefined && vec2.z != undefined) vec3.z = vec1.z - vec2.z;
        return vec3;
    },
    normalizeVector: function(vec) {
        if (vec.z != undefined) {
            var length = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2))
            vec.x = vec.x / length;
            vec.y = vec.y / length;
            vec.z = vec.z / length;
        } else {
            var length = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2))
            vec.x = vec.x / length;
            vec.y = vec.y / length;
        }
        return vec;
    },
    dotVectors: function(vec1, vec2) {
        var vec = vec1.x * vec2.x + vec1.y * vec2.y;
        return vec;
    },
    multVectors: function(vec1, scaler) {
        var vec = {};
        vec.x = vec1.x * scaler;
        vec.y = vec1.y * scaler;
        return vec;
    },
    getNormalPoint: function(p, a, b) {
        var ap = Utils.subVectors(p, a);
        var ab = Utils.subVectors(b, a);

        //ab is an vector
        ab = Utils.normalizeVector(ab);
        //dot is a float
        var dot = Utils.dotVectors(ap, ab);
        ab = Utils.multVectors(ab, dot);
        var normalPointVec = {};
        normalPointVec = Utils.addVectors(a, ab);
        return normalPointVec;
    },
    getRandomArbitrary: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    brightness: function(r, g, b) {
        var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return brightness;
    },
    spikeDir: function(x, y, centerX, centerY) {
        var vec1 = {};
        vec1.x = x;
        vec1.y = y;
        var vec2 = {};
        vec2.x = centerX;
        vec2.y = centerY;

        var spikeDir = Utils.subVectors(vec1, vec2);
        spikeDir = Utils.normalizeVector(spikeDir);
        return spikeDir;
    }
};
