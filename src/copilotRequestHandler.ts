import * as vscode from 'vscode';

const MODEL_SELECTOR: vscode.LanguageModelChatSelector = { vendor: 'copilot', family: 'gpt-4' };

export async function copilotRequestHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) {
    
    // TODO: Implement request our handling logic here
    const messages = [
        vscode.LanguageModelChatMessage.User(`You are an assistant who generates corresponding Azure CLI command combinations based on user question.`),
        vscode.LanguageModelChatMessage.User(request.prompt)
    ];
    const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
    const chatResponse = await model.sendRequest(messages, {}, token);
    for await (const fragment of chatResponse.text) {
        stream.markdown(fragment);
    }

}
