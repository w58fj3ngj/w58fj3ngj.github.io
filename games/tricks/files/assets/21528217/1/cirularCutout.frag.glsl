uniform vec4 uColor;
// uniform float uTime;
uniform float uProgression;
uniform vec2 uResolution;
uniform vec3 uWorldCoord;

uniform mat4 matrix_projection;
uniform mat4 matrix_view;

float circleHighlightColor(in vec2 position, in vec2 center, in float radius) {
    vec2 dist = position - center;
    
    if(distance(position, center) > radius) return 1.;
    else return 0.;
}

vec2 worldToScreenPoint(vec4 worldCoords) {
    // get homogeneous clip space coordinates
    vec4 clipSpace = matrix_projection * (matrix_view * worldCoords);
    
    // apply perspective divide to get normalized device coordinates
    vec3 ndc = clipSpace.xyz / clipSpace.w;
    
    // do viewport transform
    vec2 screenSpace = ((ndc.xy + 1.0) / 2.0) * uResolution;
    
    return screenSpace;
}

void main(void) {   
    vec2 normalizedPosition = gl_FragCoord.xy;
    
    vec2 normalizedCircleCenter = worldToScreenPoint(vec4(uWorldCoord.xyz, 1.));
    
    //float circleColor = circleHighlightColor(normalizedPosition, normalizedCircleCenter, 200. * sin(uTime));
    
    //float minCircleSize = 100.;
    //float maxCircleSize = 600.;
    float minCircleSize;
    float maxCircleSize;
    if(uResolution.x > uResolution.y) {
        minCircleSize = uResolution.x / 10.;
        maxCircleSize = uResolution.x;
    }
    else {
        minCircleSize = uResolution.y / 10.;
        maxCircleSize = uResolution.y;
    }
    float circleColor = circleHighlightColor(normalizedPosition, normalizedCircleCenter, minCircleSize + maxCircleSize * uProgression);
    
    float alpha = (circleColor < 1.) ?  0. : uColor.a;

	vec3 color = vec3(uColor * circleColor);   

    gl_FragColor = vec4(color, alpha);
}