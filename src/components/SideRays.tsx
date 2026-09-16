import { useRef, useEffect } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import { getCanvasDpr, getDeviceProfile, observeVisibility, debounce } from '@/lib/runtime';

type Origin = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface SideRaysProps {
  speed?: number;
  rayColor1?: string;
  rayColor2?: string;
  intensity?: number;
  spread?: number;
  origin?: Origin;
  tilt?: number;
  saturation?: number;
  blend?: number;
  falloff?: number;
  opacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const originToFlip = (origin: Origin): [number, number] => {
  switch (origin) {
    case 'top-left': return [1, 0];
    case 'bottom-right': return [0, 1];
    case 'bottom-left': return [1, 1];
    default: return [0, 0];
  }
};

const SideRays = ({
  speed = 2.5,
  rayColor1 = '#EAB308',
  rayColor2 = '#96c8ff',
  intensity = 2,
  spread = 2,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.5,
  blend = 0.75,
  falloff = 1.6,
  opacity = 1.0,
  className = ''
}: SideRaysProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: number | number[] }> | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      await new Promise<void>(resolve => setTimeout(resolve, 10));

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: getCanvasDpr(),
        alpha: true
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed, float topDist) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  
  // Wave frequencies generating ray beam patterns
  float wave1 = sin(cosAngle * seedA + iTime * speed);
  float wave2 = cos(-cosAngle * seedB + iTime * speed);
  float beam = (wave1 + wave2) * 0.5;

  // Gradual blur towards the top: threshold widens, softening ray edges into a diffuse Gaussian-like blur
  float lowThresh = mix(0.12, -0.32, topDist);
  float highThresh = mix(0.78, 1.32, topDist);
  float ray = smoothstep(lowThresh, highThresh, beam);

  // Smooth distance attenuation
  float dist = length(sourceToCoord) / iResolution.y;
  float distFade = clamp(1.0 - dist * 0.5, 0.0, 1.0);

  return ray * distFade;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.05, -0.2 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  // Calculate screen-space normalized vertical position (0 at bottom, 1 at top)
  float screenY = gl_FragCoord.y / iResolution.y;
  float topDist = clamp((screenY - 0.25) / 0.75, 0.0, 1.0);

  float s1 = rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed, topDist);
  float s2 = rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2, topDist);

  vec3 col1 = iRayColor1 * s1;
  vec3 col2 = iRayColor2 * s2;
  vec3 rgb = col1 * (1.0 - iBlend) + col2 * iBlend;

  float rayPeak = max(s1, s2);

  // Soft bounded falloff without infinite blowup
  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float falloffMod = 1.0 / (1.0 + pow(max(distanceToLight, 0.01), iFalloff) * 1.5);

  rgb *= iIntensity * falloffMod;

  float gray = dot(rgb, vec3(0.299, 0.587, 0.114));
  rgb = mix(vec3(gray), rgb, iSaturation);

  // Gradual dissolve at the very top edge of the footer container
  float topDissolve = 1.0 - smoothstep(0.68, 0.98, screenY);

  // Alpha is strictly tied to ray beam intensity, softened towards the top
  float rayAlpha = clamp(rayPeak * iOpacity * 0.55 * falloffMod * mix(1.0, topDissolve, 0.88), 0.0, 0.38);

  gl_FragColor = vec4(rgb, rayAlpha);
}`;

      const [flipX, flipY] = originToFlip(origin);
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] as number[] },
        iSpeed: { value: speed },
        iRayColor1: { value: hexToRgb(rayColor1) as number[] },
        iRayColor2: { value: hexToRgb(rayColor2) as number[] },
        iIntensity: { value: intensity },
        iSpread: { value: spread },
        iFlipX: { value: flipX },
        iFlipY: { value: flipY },
        iTilt: { value: tilt },
        iSaturation: { value: saturation },
        iBlend: { value: blend },
        iFalloff: { value: falloff },
        iOpacity: { value: opacity }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = getCanvasDpr();
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
      };

      const freezeMotion = getDeviceProfile().prefersReducedMotion;
      let isVisible = true;
      let isPageVisible = !document.hidden;

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = freezeMotion ? 0 : t * 0.001;
        try {
          renderer.render({ scene: mesh });
          if (freezeMotion || !isVisible || !isPageVisible) {
            animationIdRef.current = null;
            return;
          }
          animationIdRef.current = requestAnimationFrame(loop);
        } catch {
          return;
        }
      };

      const tryStart = () => {
        if (isVisible && isPageVisible && animationIdRef.current === null && !freezeMotion) {
          animationIdRef.current = requestAnimationFrame(loop);
        }
      };

      const onResize = debounce(updateSize, 150);
      window.addEventListener('resize', onResize);
      updateSize();
      if (freezeMotion) {
        loop(0);
      } else {
        animationIdRef.current = requestAnimationFrame(loop);
      }

      const unobserve = observeVisibility(containerRef.current, (visible) => {
        isVisible = visible;
        if (visible) tryStart();
        else if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      }, { threshold: 0.1 });

      const onPageVisibility = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) tryStart();
        else if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      };
      document.addEventListener('visibilitychange', onPageVisibility);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener('resize', onResize);
        unobserve();
        document.removeEventListener('visibilitychange', onPageVisibility);
        if (renderer) {
          try {
            const loseCtx = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseCtx) loseCtx.loseContext();
            const canvas = renderer.gl.canvas;
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
          } catch {
            // Ignore context cleanup errors
          }
        }
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;
    u.iSpeed.value = speed;
    u.iRayColor1.value = hexToRgb(rayColor1);
    u.iRayColor2.value = hexToRgb(rayColor2);
    u.iIntensity.value = intensity;
    u.iSpread.value = spread;
    const [flipX, flipY] = originToFlip(origin);
    u.iFlipX.value = flipX;
    u.iFlipY.value = flipY;
    u.iTilt.value = tilt;
    u.iSaturation.value = saturation;
    u.iBlend.value = blend;
    u.iFalloff.value = falloff;
    u.iOpacity.value = opacity;
  }, [speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none z-[3] ${className}`.trim()}
    />
  );
};

export { SideRays };
export default SideRays;
