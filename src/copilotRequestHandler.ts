import * as vscode from 'vscode';

interface ResponseData {  
    success: boolean;  
    message: string;  
}  

type Dictionary = Record<string, string>;

async function sendPostRequest(url: string, auth_token: string, data: Dictionary): Promise<ResponseData> {  
    try {  
        const response = await fetch(url, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',
                "Authorization": auth_token  
            },  
            body: JSON.stringify(data),  
        });  
  
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
  
        const responseData: ResponseData = await response.json() as ResponseData;  

        return responseData;  
          
    } catch (error) {  
        console.error('Unexpected error:', error);  
        throw error;  
    }  
}  

const endpointUrl = 'https://azclitools-copilot-apim-test.azure-api.net/azcli/copilot';
const auth_token = 'xxxxxxxx'

export async function copilotRequestHandler(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken) {
    
    // TODO: Implement request our handling logic here
    const postData: Dictionary = {  
        "question": request.prompt 
    };

    const chatResponse = await sendPostRequest(endpointUrl, auth_token, postData);
    for await (const fragment of chatResponse.message) {
        stream.markdown(fragment);
    }

}
