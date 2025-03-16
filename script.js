document.addEventListener("DOMContentLoaded", () => {
    const getInput = (id) => document.getElementById(id).value.trim();
    const updateResponse = (data) => (document.getElementById("response").value = JSON.stringify(data, null, 2));

    async function sendRequest(endpoint, method = "GET", body = null) {
        const idInstance = getInput("idInstance");
        const apiTokenInstance = getInput("apiTokenInstance");

        if (!idInstance || !apiTokenInstance) return alert("⚠️ Enter both idInstance and apiTokenInstance.");

        try {
            const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : null,
            });
            updateResponse(await response.json());
        } catch (error) {
            updateResponse({ error: error.message });
        }
    }

    window.getSettings = () => sendRequest("getSettings");
    window.getStateInstance = () => sendRequest("getStateInstance");
    window.sendMessage = () => sendRequest("sendMessage", "POST", { chatId: getInput("phoneNumber") + "@c.us", message: getInput("messageText") });
    window.sendFileByUrl = () => sendRequest("sendFileByUrl", "POST", { chatId: getInput("phoneNumber") + "@c.us", urlFile: getInput("fileUrl"), fileName: getInput("fileUrl").split("/").pop(), caption: "📄 Here is your file!" });
});
