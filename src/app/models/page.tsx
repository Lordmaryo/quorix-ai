import ModelCard from "@/components/custom/ModelCard";
import { modelRoutes } from "@/data/modelInfo";
import React from "react";

const ExploreModels = () => {
  return (
    <div className="pt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Explore Models</h1>
        <p className="max-w-2xl mt-2 mx-auto text-muted-foreground text-sm sm:text-base">
          Discover and explore a variety of models available in our platform.
          from image creation to code generation, we have it all!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {modelRoutes.map((model) => (
          <ModelCard
            key={model.route}
            name={model.name}
            description={model.description}
            image={model.image}
            route={model.route}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreModels;
