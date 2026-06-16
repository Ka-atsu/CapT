// Adjust this import path depending on where your LessonPage.tsx is actually saved!
// If you used the same structure as the Topic Hub, it should look something like this:
import LessonPage from "../../features/learn/lesson/LessonPage";

export default function LessonRoute() {
  return (
    <main className="h-full w-full">
      <LessonPage />
    </main>
  );
}
