import random
import matplotlib.pyplot as plt
import numpy as np

def simulate(hit, count, size=10000):
    total_damage = 0
    for _ in range(size):
        damage = 0
        for _ in range(count):
            roll = random.randint(1, 12)
            if roll <= hit and roll != 12:
                damage += roll
        total_damage += damage
    return total_damage / size

def dis(hit):
    results = []
    for i in range(1, hit + 1):
        results.append(simulate(hit - i + 1, i))
    while len(results) < 12:
        results.append(0)
    return results

def main():
    best = []
    y = []
    for i in range(1, 12):
        y.append(dis(i))
        #best.append(max(y))
    print(y)
    # Compute the delta (difference between consecutive best values)
    #delta = [0] + [best[i] - best[i-1] for i in range(1, len(best))]
    
    #print("Best values:", best)
    #print("Delta values:", delta)
    #print("Min Delta:", min(delta), "Average Delta:", sum(delta)/len(delta), "Max Delta:", max(delta))

    # Plotting
    x = [j for j in range(1, 13)]
    #plt.plot(x, delta, label="Delta")
    for i,val in enumerate(y):
        plt.plot(x, val, label=str(i))
    plt.xlabel("Number of attacks")
    plt.ylabel("Avg damage")
    plt.legend(loc="upper left")
    plt.show()

if __name__ == "__main__":
    main()

