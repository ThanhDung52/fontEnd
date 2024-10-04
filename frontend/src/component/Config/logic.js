export const isPresentInFavorites = (favorites, restaurant) => {
    // Kiểm tra nếu favorites không phải là mảng hoặc rỗng
    if (!Array.isArray(favorites)) {
        return false;
    }
    
    for (let item of favorites) {
        if (restaurant.id === item.id) {
            return true;
        }
    }
    return false;
}
