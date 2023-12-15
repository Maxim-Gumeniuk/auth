import { RefreshToken } from "@/db/refresh"

const removeToken = async (userId: string) => {
    const refreshToken = await RefreshToken.findOne({ userId });

    if (!refreshToken) {
        return;
    }

    await RefreshToken.deleteOne(refreshToken);
}

export const logoutService = {
    removeToken,
}
