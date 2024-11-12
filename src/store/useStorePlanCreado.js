import { create } from "zustand";
import { persist } from "zustand/middleware";

// PLAN CREADO POR EL USUARIO
export const useStorePlanCreado = create(
  persist(
    (set) => ({
      planCreado: [],

      // Añadir un nuevo ejercicio al plan
      setPlanCreado: (exercise) =>
        set((state) => ({
          planCreado: [
            ...state.planCreado,
            {
              ...exercise,
              numeroDiaDelPlan: 0,
              ordenDelEjercicio: 0,
              series: 0,
              repeticiones: 0,
            },
          ],
        })),

      // Limpiar todos los ejercicios
      clearPlan: () => set({ planCreado: [] }),

      // Actualizar un ejercicio existente
      updateExercise: (id, updatedFields) =>
        set((state) => ({
          planCreado: state.planCreado.map((exercise) =>
            exercise.id === id ? { ...exercise, ...updatedFields } : exercise
          ),
        })),
    }),
    {
      name: "plan-creado-storage",
    }
  )
);
