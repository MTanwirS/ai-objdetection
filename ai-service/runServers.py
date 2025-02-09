### 1. **Using Python's `subprocess` to Run Both Servers**

import subprocess
import sys
import os
import signal
#1 import multiprocessing


# Define the commands to run the frontend and backend



def start_frontend():
    frontend_command = ["npm", "run", "dev"]
    return subprocess.Popen(frontend_command, cwd='./ui-service', stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    #1 subprocess.run(frontend_command, cwd='./frontend')

def start_backend():
    backend_command = ["uvicorn", "main:app", "--reload"]
    return subprocess.Popen(backend_command, cwd='./ai-service', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    #1 subprocess.run(backend_command, cwd='./backend') 

# Function to run the frontend and backend in separate processes
def run_servers():
    # Start the frontend server
    frontend_process = start_frontend()
    #1 = multiprocessing.Process(target=start_frontend)

    # Start the backend server
    backend_process = start_backend()
    #1 = multiprocessing.Process(target=start_backend)
    
    #1 frontend_process.start()
    #1 backend_process.start()

    #1 frontend_process.join()
    #1 backend_process.join()



    # Wait for the frontend and backend processes to complete (or be killed)
    try:
        print("Servers are running...")
        frontend_process.communicate()
        backend_process.communicate()
    except KeyboardInterrupt:
        print("\nStopping servers...")
        # If interrupted, kill both processes
        frontend_process.send_signal(signal.SIGINT)
        backend_process.send_signal(signal.SIGINT)
        frontend_process.wait()
        backend_process.wait()
        print("Servers stopped.")

# Run the servers
if __name__ == "__main__":
    #1 try:
    #1     print("Starting servers...")
    run_servers()
    #1 except KeyboardInterrupt:
    #1     print("\nStopping servers...")
    #1     os.kill(frontend_process.pid, signal.SIGINT)
    #1     os.kill(backend_process.pid, signal.SIGINT)
    #1     print("Servers stopped.")
