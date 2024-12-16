import User from '../utils/user';
import Api from '../utils/Api';

export default async function userMount() {
    // Получение информации о текущем пользователе
    const currentUser = await Api.getUser();

    if (!currentUser.ok) {
        console.log('Пользователь не авторизован');
        return;
    }

    User.username = currentUser.data.profile.username;
    User.id = currentUser.data.id;
    User.email = currentUser.data.profile.email;
    User.avatarPath = currentUser.data.profile.avatarPath ? currentUser.data.profile.avatarPath : '';
    User.isSignedIn = true;
};
