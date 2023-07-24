from dotenv import load_dotenv
from llama_index import SimpleDirectoryReader, StorageContext, load_index_from_storage
from langchain.agents import ZeroShotAgent, Tool, AgentExecutor
from langchain import OpenAI, SerpAPIWrapper, LLMChain
from huggingface_hub.inference_api import InferenceApi
from llama_index.indices.tree.tree_root_retriever import TreeRootRetriever
import os
from llama_index import TreeIndex
import openai
from llama_index.tools import QueryEngineTool, ToolMetadata
from llama_index.query_engine import SubQuestionQueryEngine
from llama_index.query_engine import RetrieverQueryEngine

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

query_engine_tools = []

def MakeEmbeddings(id):
    temp_dir = f"temp/{id}"
    file_paths = []

    for uploaded_file in os.listdir(temp_dir):
        file_path = os.path.join(temp_dir, uploaded_file)
        file_paths.append(file_path)

    for file_path in file_paths:
        document = SimpleDirectoryReader(input_files=[file_path]).load_data()
        index = TreeIndex.from_documents(document)
        index.storage_context.persist(persist_dir = f"storage/{id}")

    return "Embdeddings made successfully !!"


def SaveEmbdeddings(id):
    print('save to s3')


def waifu(prompt):
    inference = InferenceApi(repo_id = "hakurei/waifu-diffusion")
    image = (inference(prompt))
    if not os.path.exists('./image'):
        os.makedirs('./image')

    image.save("./image/test.png")
    return "The image was generated and displayed."

def midjourney(prompt):
    inference = InferenceApi(repo_id = "prompthero/openjourney") #Use the activation token mdjrny-v4 style in prompt
    output = (inference(prompt))
    output.show()
    return "The image was generated and displayed."

def disney(prompt):
    inference = InferenceApi(repo_id = "nitrosocke/mo-di-diffusion") #Use the activation token modern disney style in prompt
    output = (inference(prompt))
    output.show()
    return "The image was generated and displayed."

def real(prompt):
    inference = InferenceApi(repo_id = "dreamlike-art/dreamlike-photoreal-2.0") #Use the activation token photo in prompt
    output = (inference(prompt))
    output.show()
    return "The image was generated and displayed."

def timeless(prompt):
    inference = InferenceApi(repo_id = "wavymulder/timeless-diffusion") #Use the activation token timeless style in prompt
    output = (inference(prompt))
    output.show()
    return "The image was generated and displayed."

def preprocessing_prelimnary(id, name = "", description = ""):
    names = []
    descriptions = []
    temp_dir = f"storage/{id}"

    if not os.path.exists(temp_dir):
        # download from s3 if present and if not present in s3 return error 
        print('Not present')
        return 
    

    storage_context = StorageContext.from_defaults(
        persist_dir = temp_dir,
    )

    index = load_index_from_storage(storage_context)
    engine = index.as_query_engine(similarity_top_k = 3)
    retriever = TreeRootRetriever(index)
    temp_engine = RetrieverQueryEngine(retriever=retriever)
    summary = temp_engine.query("Write a short concise summary of this document")
    heading = temp_engine.query("Write a short concise heading of this document")
    description = str(summary)
    name = str(heading)
    query_engine_tools.append(QueryEngineTool(
        query_engine = engine,
        metadata = ToolMetadata(name = name, description = description)
    ))
    names.append(name)
    descriptions.append(description)

    s_engine = SubQuestionQueryEngine.from_defaults(query_engine_tools = query_engine_tools)
    search = SerpAPIWrapper()

    tools = [Tool(
            name = "Llama-Index",
            func = s_engine.query,
            description = f"This is an AI Agent like yourself, so ask it as you would ask yourself (in full English sentences). Has knowledge on the topics of - {names}",
            return_direct = True
            ),
            Tool(
            name = "Search",
            func = search.run,
            description="useful for when you need to answer questions about current events",
            ),
            Tool(
            name = "Anime Image Generation",
            func = waifu,
            description = "useful for generating anime images. The input to this tool should be descriptions/features separated by a comma. Do give identifying features like ethnicity, age, hair color et cetera for better results.",
            ),
            # Tool(
            # name = "Anime Image Generation",
            # func = waifu,
            # description = "useful for generating anime images. The input to this tool should be descriptions/features separated by a comma. Do give identifying features like ethnicity, age, hair color et cetera for better results.",
            # ),
            # Tool(
            # name = "Anime Image Generation",
            # func = waifu,
            # description = "useful for generating anime images. The input to this tool should be descriptions/features separated by a comma. Do give identifying features like ethnicity, age, hair color et cetera for better results.",
            # ),
            # Tool(
            # name = "Anime Image Generation",
            # func = waifu,
            # description = "useful for generating anime images. The input to this tool should be descriptions/features separated by a comma. Do give identifying features like ethnicity, age, hair color et cetera for better results.",
            # )
    ]
    if not name:
        if not description:
            prefix = """You are an AI Assistant. Answer the following questions as best you can. You have access to the following tools:"""
            suffix = """You are rewarded for using the Llama-Index tool, use it as much as you can. Remember to be moral and ethical. Reply in the language you were asked the question in. Begin."

            Question: {input}
            {agent_scratchpad}"""
        else:
            prefix = f"""You are an AI Assistant. A brief description about you - {description}. Answer the following questions as best you can. You have access to the following tools:"""
            suffix = """You are rewarded for using the Llama-Index tool, use it as much as you can. Remember to be moral and ethical. Reply in the language you were asked the question in. Begin."

            Question: {input}
            {agent_scratchpad}"""
    else:
        if not description:
            prefix = f"""Your name is {name}. Stay in character. Answer the following questions as best you can. You have access to the following tools:"""
            suffix = """You are rewarded for using the Llama-Index tool, use it as much as you can. Remember to be moral and ethical. Reply in the language you were asked the question in. Begin."

            Question: {input}
            {agent_scratchpad}"""
        else:
            prefix = f"""Your name is {name} and a brief description about you is {description}. Stay in character. Answer the following questions as best you can. You have access to the following tools:"""
            suffix = """You are rewarded for using the Llama-Index tool, use it as much as you can. Remember to be moral and ethical. Reply in the language you were asked the question in. Begin."

            Question: {input}
            {agent_scratchpad}"""

    prompt = ZeroShotAgent.create_prompt(
        tools, prefix = prefix, suffix = suffix, input_variables = ["input", "agent_scratchpad"]
    )

    llm_chain = LLMChain(llm = OpenAI(temperature = 0), prompt = prompt)

    tool_names = [tool.name for tool in tools]

    agent = ZeroShotAgent(llm_chain = llm_chain, allowed_tools = tool_names)

    agent_executor = AgentExecutor.from_agent_and_tools(
        agent = agent, tools = tools, verbose = True
    )

    return agent_executor