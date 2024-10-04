export const categorizeIngredients = (ingredientsItems
) => {
    return ingredientsItems
        .reduce((acc, ingredient) => {
            const { category } = ingredient;
            if (!acc[category.name]) {
                acc[category.name] = [];
            }
            acc[category.name].push(ingredient);
            return acc;
        }, {})
}

