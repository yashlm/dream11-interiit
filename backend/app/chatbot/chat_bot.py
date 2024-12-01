# from langchain_community.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_core.prompts import ChatPromptTemplate
# from langchain.chains.combine_documents import create_stuff_documents_chain
# from langchain.chains import create_retrieval_chain
# from langchain_community.utilities.sql_database import SQLDatabase
# from operator import itemgetter
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.prompts import PromptTemplate
# from langchain_core.runnables import RunnablePassthrough
# from langchain.chains import create_sql_query_chain
# from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
# from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder,FewShotChatMessagePromptTemplate,PromptTemplate
# from langchain_chroma import Chroma
# from langchain_core.example_selectors import SemanticSimilarityExampleSelector
# from langchain.chains import LLMChain
# import os

# current_dir = os.getcwd()
# # Path to the PDF file relative to the current directory (without a leading slash)
# file_path = os.path.join(current_dir, "app/chatbot/bot_manual.pdf")
# # Check if the file exists
# if os.path.exists(file_path):
#     loader = PyPDFLoader(file_path)
# else:
#     raise FileNotFoundError(f"The file {file_path} does not exist")


# os.environ["GOOGLE_API_KEY"] = "AIzaSyC42Db4s2A6Y7tCBFct5voL4rz3YHAvc5o"
# llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", convert_system_message_to_human=True)

# docs = loader.load()
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=500)
# text_splitter.split_documents(docs)
# documents=text_splitter.split_documents(docs)
# embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", task_type="retrieval_document")
# db=FAISS.from_documents(documents,embedding=embeddings)
# ## Design ChatPrompt Template
# prompt = ChatPromptTemplate.from_template("""
# Based on the context, provide a detailed response to the user's query in an intuitive manner.
# Start by retrieving all relevant information for the user's question, ensuring the steps flow logically (e.g., if the query is about "selecting players," include the steps before player selection, like how to select a match).
# Ensure the answer is clear, concise, and directly addresses the user's question.
# If necessary, refer to relevant sections of the manual to support the answer.
# Avoid adding features or functions not mentioned in the manual.
# Make the answer user-friendly, ensuring the process is easy to follow and not overwhelming.
# If the input is unclear, ask for further clarification.
# <context>
# {context}
# </context>
# Question: {input}""")


# document_chain=create_stuff_documents_chain(llm,prompt)


# retriever=db.as_retriever()
# retrieval_chain=create_retrieval_chain(retriever,document_chain)


# def user_manual_llm(question):
#    response=retrieval_chain.invoke({"input":question})
#    result = response['answer']
#    return result




# ### DATABASE QUERY

# # Replace with your PostgreSQL database credentials
# db_user = "postgres"
# db_password = "Ak%40123"
# db_host = "localhost"
# db_name = "dream11"


# db = SQLDatabase.from_uri(
#    f"postgresql://{db_user}:{db_password}@{db_host}/{db_name}"
# )

# llm = ChatGoogleGenerativeAI(
#    model="gemini-1.5-pro",
#    temperature=0,
#    max_tokens=None,
#    timeout=None,
#    max_retries=2,
# )

# answer_prompt = PromptTemplate.from_template(
#    """Given the following user question, corresponding SQL query, and SQL result, answer the user question.

# Question: {question}
# SQL Query: {query}
# SQL Result: {result}
# Answer: """
# )


# rephrase_answer = answer_prompt | llm | StrOutputParser()

# examples = [
#    # Specific queries (Based on a specific condition)
#    {
#        "input": "Which players from 'Delhi Capitals' hit the most sixes in the 2023 season?",
#        "query": """
#            SELECT player_stats.full_name, MAX(player_stats.sixes_scored)
#            FROM player_stats
#            JOIN players ON player_stats.player_id = players.id
#            JOIN teams ON players.team_id = teams.id
#            WHERE teams.name = 'Delhi Capitals' AND player_stats.start_date BETWEEN '2023-01-01' AND '2023-12-31'
#            GROUP BY player_stats.full_name
#            ORDER BY MAX(player_stats.sixes_scored) DESC LIMIT 1;
#        """
#    },
#    # Common queries (Frequently asked, general information)
#    {
#        "input": "List all the players who played for 'Chennai Super Kings' in the 2023 IPL season.",
#        "query": """
#            SELECT players.name
#            FROM players
#            JOIN teams ON players.team_id = teams.id
#            WHERE teams.name = 'Chennai Super Kings' AND players.id IN (SELECT player_id FROM player_stats WHERE start_date BETWEEN '2023-01-01' AND '2023-12-31');
#        """
#    },

#    # Combination queries (Using multiple clauses)
#    {
#        "input": "Find all players who played in the '2023 IPL final' and scored more than 30 runs.",
#        "query": """
#            SELECT player_stats.full_name, player_stats.runs_scored
#            FROM player_stats
#            JOIN players ON player_stats.player_id = players.id
#            JOIN matches ON player_stats.match_id = matches.match_id
#            WHERE matches.event_name = 'IPL 2023' AND matches.match_number = 'Final'
#              AND player_stats.runs_scored > 30;
#        """
#    }
# ]

# example_prompt = ChatPromptTemplate.from_messages(
#    [
#        ("human", "{input}\nSQLQuery:"),
#        ("ai", "{query}"),
#    ]
# )
# few_shot_prompt = FewShotChatMessagePromptTemplate(
#    example_prompt=example_prompt,
#    examples=examples,
#    input_variables=["input","top_k"],
#    # input_variables=["input"],
# )

# final_prompt = ChatPromptTemplate.from_messages(
#    [
#        ("system", "You are a MySQL expert. Given an input question, create a syntactically correct MySQL query to run. Unless otherwise specificed.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries."),
#        few_shot_prompt,
#        ("human", "{input}"),
#    ]
# )



# def table_llm(question):
  
#    # print(final_prompt.format(input= question,table_info="some table info"))
#    generate_query = create_sql_query_chain(llm, db,final_prompt)
#    query_data = generate_query.invoke({"question": question})


#    # print(query_data)
#    query = query_data.strip('`').strip().split('\n', 1)[1].strip()
#    execute_query = QuerySQLDataBaseTool(db=db)
#    result = execute_query.invoke(query)


#    answer = rephrase_answer.invoke({"question": question, "query": query, "result": result})
#    return answer



# # ### INTEGRATING THE TOOL

# from langchain.tools import Tool


# # Define the User Manual Tool
# user_manual_tool = Tool(
#    name="UserManual",
#    func=user_manual_llm,
#    description="Provides intuitive answers by referencing the user manual. Ideal for questions about bot features, usage, and manual details."
# )


# # Define the Database Query Tool
# db_query_tool = Tool(
#    name="DBQuery",
#    func=table_llm,
#    description="Executes database queries and provides answers for questions requiring data retrieval from the database."
# )




# # Define the Tool Selection Prompt
# tool_selection_prompt = PromptTemplate.from_template("""
# You are a smart assistant that determines the best tool to use based on the user's question.


# Here are the available tools:
# 1. UserManual: For queries about bot features, usage, and manual details.
# 2. DBQuery: For queries requiring data about a person or a cricket match from 01 August 2024.


# Given the user question: "{question}"
# Determine which tool to use by returning either "UserManual" or "DBQuery".
# """)


# tool_selection_chain = LLMChain(llm=llm, prompt=tool_selection_prompt)

# def tool_selector(question):
#    # Determine the tool to use
#    tool_name = tool_selection_chain.run({"question": question}).strip()


#    # Use the chosen tool
#    if tool_name == "UserManual":
#        return user_manual_tool.run(question)
#    elif tool_name == "DBQuery":
#        return db_query_tool.run(question)
#    else:
#        return f"Error: Unable to determine the appropriate tool for the question: {question}"
