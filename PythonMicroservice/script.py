from agent import preprocessing_prelimnary
import sys 

agent_executor = None

def initialize_agent_executor():
    global agent_executor
    agent_executor = preprocessing_prelimnary('AI Bot', 'AI Assistant for answering questions.')

def run(question):
    response = agent_executor.run(question)
    return response

if __name__ == "__main__":
    message = sys.argv[1] if len(sys.argv) > 1 else ""
    initialize_agent_executor()
    run(message)