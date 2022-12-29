export const copy = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export const getWinners = (data: { userName: string, text: number }[]) => {
    const sortedUsers = data.sort((a, b) => b.text - a.text);
    return sortedUsers.filter((item) => item.text === sortedUsers[0].text)
        .map(item => item.userName);
};

export const shuffle = <T>(array: T[]) =>  {
    let newArray: T[] = array.slice(0);
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}