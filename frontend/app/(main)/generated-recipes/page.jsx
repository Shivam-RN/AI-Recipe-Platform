"use client";

import { useEffect } from "react";
import { Sparkles, Loader2, ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import RecipeCard from "@/components/RecipeCard";
import { getGeneratedRecipes } from "@/actions/recipe.action";

export default function GeneratedRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchGeneratedRecipes,
  } = useFetch(getGeneratedRecipes);

  useEffect(() => {
    fetchGeneratedRecipes();
  }, []);

  const recipes = recipesData?.recipes || [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-1 mb-8">
          <Sparkles className="w-20 h-20 text-orange-600" />
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
              My AI Recipes
            </h1>
            <p className="text-stone-600">
              Your personal AI creations in one place.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-6" />
            <p className="text-stone-600">
              Loading your AI recipes...
            </p>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.documentId}
                recipe={recipe}
                variant="list"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-stone-200">
            <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-orange-600" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              No AI Recipes Yet
            </h3>

            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Start generating recipes with AI and they’ll appear here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                  <ChefHat className="w-4 h-4" />
                  Generate Recipe
                </Button>
              </Link>

              <Link href="/pantry">
                <Button variant="outline" className="border-stone-300 gap-2">
                  Use Pantry
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}