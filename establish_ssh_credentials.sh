#!/bin/bash

# List of clients (hostnames or IPs)
clients=("user1@host1" "user2@host2")


# SSH options: suppress password prompt, accept new host keys automatically
ssh_opts="-o StrictHostKeyChecking=accept-new -o BatchMode=yes"

for client in "${clients[@]}"; do
    echo "Connecting to $client to exchange keys..."

    if [ -n "$ssh_key" ]; then
        ssh $ssh_opts -i "$ssh_key" "$client" "exit"
    else
        ssh $ssh_opts "$client" "exit"
    fi

    if [ $? -eq 0 ]; then
        echo "Connection to $client successful."
    else
        echo "Warning: Could not connect to $client. Ensure SSH keys are set up."
    fi
done

echo "Key exchange completed."
