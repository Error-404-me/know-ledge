import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/common/Layout";
import { ButtonLink, EmptyState } from "@/components/common/ui";
import { useProgress } from "@/hooks/ProgressContext";
import { getActiveTopic } from "@/utils/insights";
import HomePage from "@/pages/HomePage";
import LessonPage from "@/pages/LessonPage";
import PracticePage from "@/pages/PracticePage";
import ProgressPage from "@/pages/ProgressPage";
import ResultsPage from "@/pages/ResultsPage";
import TopicPage from "@/pages/TopicPage";
import TopicsPage from "@/pages/TopicsPage";

/** /practice → practice for the topic the student is currently on */
function PracticeIndex() {
  const { snapshot } = useProgress();
  const topic = getActiveTopic(snapshot);
  return topic ? <Navigate to={`/practice/${topic.id}`} replace /> : <Navigate to="/topics" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="topics/:topicId" element={<TopicPage />} />
        <Route path="lessons/:topicId/:lessonId" element={<LessonPage />} />
        <Route path="practice" element={<PracticeIndex />} />
        <Route path="practice/:topicId" element={<PracticePage />} />
        <Route path="results/:attemptId" element={<ResultsPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route
          path="*"
          element={
            <EmptyState
              title="Page not found"
              message="That page doesn’t exist."
              action={<ButtonLink to="/">Go home</ButtonLink>}
            />
          }
        />
      </Route>
    </Routes>
  );
}
