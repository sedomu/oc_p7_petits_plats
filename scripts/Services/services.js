function remove(term1, term2) {
    return term1 === term2
}

function escapeInput(userInput){
    return userInput.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}