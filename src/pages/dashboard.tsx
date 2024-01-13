import { api } from "@/utils/api";

export default function DashboardPage() {
  const { mutate } = api.admin.sensitive.useMutation();

  return (
    <div>
      Dashboard{" "}
      <button type="button" onClick={() => mutate()}>
        botton top secret
      </button>{" "}
    </div>
  );
}
