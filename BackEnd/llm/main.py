from langchain_ollama import OllamaLLM
from langchain_community.document_loaders.mongodb import MongodbLoader
from dotenv import load_dotenv
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
def getResponse(inp):
    load_dotenv()
    llm = OllamaLLM(model='llama3.2')
    loader = MongodbLoader(
        connection_string= os.getenv("mongo_db_connection"),
        db_name="EcoRoute",
        collection_name="Catalog",
        field_names= ["name","description","category","label","ecoPlus","price"]
    )
    data = loader.load()
    textSplitter= RecursiveCharacterTextSplitter()
    final_data = textSplitter.split_documents(data)
    db = Chroma.from_documents(final_data,OllamaEmbeddings(model='llama3.2'))
    promptTemp = ChatPromptTemplate.from_template(
        """"
        Answer the following question based only on the provided context.
        I will tip you $1000 if the user finds the answer helpful.
        <context>
        {context}
        </context>
        Question: {input}
"""
    )
    doc_chain = create_stuff_documents_chain(llm,promptTemp)
    retriever = db.as_retriever()
    retrieverChain = create_retrieval_chain(retriever=retriever,combine_docs_chain=doc_chain)
    response = retrieverChain.invoke({"input":inp})
    return response["answer"]

def main():
    getResponse("What is Alicia Morgan's father name?")
if __name__ == "__main__":
    main()

    