export const handleFollow = async (person, resetFn) => {
    await fetch(`/followers/${person.id}`, {
        method: "POST"
    });
    resetFn();
};
export const handleUnfollow = async (person, resetFn) => {
    await fetch(`/followers/${person.id}`, {
        method: "DELETE"
    });
    resetFn();
};
