import { useState, useEffect, useRef, RefObject } from "react";

export function useLessonLogic(
  lessonId: number | string,
  stepsLength: number,
  mainScrollRef: RefObject<HTMLElement | null>,
) {
  const [visitedSteps, setVisitedSteps] = useState<Record<number, boolean>>({
    0: true,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [hasCompletedAllSteps, setHasCompletedAllSteps] = useState(false);
  const [solved, setSolved] = useState(false);

  const stepRefs = useRef<HTMLDivElement[]>([]);

  // Reset state when the lesson changes
  useEffect(() => {
    setVisitedSteps({ 0: true });
    setActiveStep(0);
    setHasCompletedAllSteps(false);
    setSolved(false);
  }, [lessonId]);

  // Scroll tracking observer
  useEffect(() => {
    const observerOptions = {
      root: mainScrollRef.current,
      rootMargin: "-35% 0px -40% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-step-index"));
          setActiveStep(index);
          setVisitedSteps((prev) => {
            const updated = { ...prev, [index]: true };
            if (index === stepsLength - 1) {
              setHasCompletedAllSteps(true);
            }
            return updated;
          });
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [stepsLength, mainScrollRef]);

  return {
    visitedSteps,
    activeStep,
    hasCompletedAllSteps,
    solved,
    setSolved,
    stepRefs,
  };
}
