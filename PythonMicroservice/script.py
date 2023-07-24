from agent import preprocessing_prelimnary
import sys 

agent_executor = None

def initialize_agent_executor(id):
    global agent_executor
    agent_executor = preprocessing_prelimnary(id,'AI Bot', 'AI Assistant for answering questions.')

def run(question):
    response = agent_executor.run(question)
    return response

if __name__ == "__main__":
    message = sys.argv[1] if len(sys.argv) > 1 else ""
    id = sys.argv[2] if len(sys.argv) > 1 else ""
    initialize_agent_executor(id)
    run(message)