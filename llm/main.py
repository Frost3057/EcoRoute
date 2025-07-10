
from langchain_ollama import OllamaLLM
def getResponse(input:str):
    llm = OllamaLLM(model='llama3.2')
    