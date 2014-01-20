#!/bin/sh
#toriptables.sh
# I learned this from https://wiki.torproject.org/noreply/TheOnionRouter/TransparentProxy

#Reject all ICMP packets because they have no owner which creates a leak
iptables -A OUTPUT -p icmp -j REJECT

#All traffic for the user root will go through tor
iptables -t nat -A OUTPUT ! -o lo -p tcp -m owner --uid-owner root -m tcp -j REDIRECT --to-ports 9040
iptables -t nat -A OUTPUT ! -o lo -p udp -m owner --uid-owner root -m udp --dport 53 -j REDIRECT --to-ports 53
iptables -t filter -A OUTPUT -p tcp -m owner --uid-owner root -m tcp --dport 9040 -j ACCEPT
iptables -t filter -A OUTPUT -p udp -m owner --uid-owner root -m udp --dport 53 -j ACCEPT
iptables -t filter -A OUTPUT ! -o lo -m owner --uid-owner root -j DROP
