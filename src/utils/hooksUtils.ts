import * as React from 'react';

/**
 * Si necesitas que se comporte igual que didupdate de clase crear uno que use useLayaourEffect.
 * https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
 */
export function useDidUpdate(cb: () => void, inputs: any[]) {
  const postMount = React.useRef(false);
  React.useEffect(() => {
    if (postMount.current) {
      return cb();
    } else {
      postMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}

export function useEffectAsync(
  effect: () => void,
  inputs: any[],
  cleanup: () => void
) {
  React.useEffect(() => {
    effect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}

export function useDidMount(cb: () => void, cleanup?: () => void) {
  React.useEffect(() => {
    cb();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
