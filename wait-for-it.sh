#!/bin/bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until curl "$host"; do
  >&2 echo "$host is unavailable - sleeping"
  sleep 1
done

>&2 echo "$host is up - executing command"
exec $cmd