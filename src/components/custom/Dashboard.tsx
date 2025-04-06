"use client";
import Form from "./Form";
import Header from "./Header";
import { modelRoutes } from "@/data/modelInfo";

const Dashboard = () => {
  const conversation =
    modelRoutes.find((route) => route.name === "Conversation AI") ||
    modelRoutes[1];

  return (
    <div className="py-4 space-y-10">
      <Header
        image={conversation?.image}
        title={conversation?.name}
        description={conversation?.description}
      />

      <Form />
    </div>
  );
};

export default Dashboard;
