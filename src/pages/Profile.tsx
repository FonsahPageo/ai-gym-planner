import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/PlanDisplay";

export default function Profile() {
  const { user, isLoading, plan, generatePlan } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1>Your Training Plan</h1>
            <p>
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button variant="secondary" className="gap-2" onClick={async () => await generatePlan()}>
            <RefreshCcw className="w-4 h-4" />
            Regenerate plan
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* goal card */}
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs  text-muted">Goal</p>
              <p className="font-medium text-sm">{plan.overview.goal}</p>
            </div>
          </Card>

          {/* frequency card */}
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs  text-muted">Frequency</p>
              <p className="font-medium text-sm">{plan.overview.frequency}</p>
            </div>
          </Card>

          {/* split card */}
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs  text-muted">Split</p>
              <p className="font-medium text-sm">{plan.overview.split}</p>
            </div>
          </Card>

          {/* Version card */}
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs  text-muted">Version</p>
              <p className="font-medium text-sm">{plan.version}</p>
            </div>
          </Card>
        </div>

        {/* plan notes */}
        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Program notes</h2>
          <p className="text-muted text-sm leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        {/* weekly schedule */}
        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card variant="bordered" className="mb-8 mt-8">
          <h2 className="font-semibold text-lg mb-2">Progression Strategy</h2>
          <p className="text-muted text-sm leading-relaxed">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
}
