import json
from matplotlib import pyplot as plt

conns = (50, 100, 150, 200, 250, 300)

# load benchmarks for given path and connection counts
def load_bench(path):
    res = dict()
    for conn in conns:
        with open(f'./res/{path}/bench_{conn}.json', 'r') as file:
            res[conn] = json.load(file)
    return res

regular_data = load_bench('/regular/api/v1')
balanced_data = load_bench('/balanced/api/v1')

def get_rps_latency(raw_data):
    rps = [{
        'mean': raw_data[conn]['result']['rps']['mean'],
        'stddev': raw_data[conn]['result']['rps']['stddev'],
        'max': raw_data[conn]['result']['rps']['max']
    } for conn in conns]

    latency = [{
        'mean': raw_data[conn]['result']['latency']['mean'],
        'stddev': raw_data[conn]['result']['latency']['stddev'],
        'max': raw_data[conn]['result']['latency']['max']
    } for conn in conns]

    return rps, latency

rps_regular, latency_regular = get_rps_latency(regular_data)
rps_balanced, latency_balanced = get_rps_latency(balanced_data)

# rps_r_mean = [d['mean'] for d in rps_regular]
# rps_r_err = [d['stddev'] for d in rps_regular]
# rps_b_mean = [d['mean'] for d in rps_balanced]
# rps_b_err = [d['stddev'] for d in rps_balanced]

plt.subplot(1, 2, 1)
plt.plot(conns, [d['mean'] for d in rps_regular], label='regular')
# plt.fill_between(conns,
#     [m - 0.5*e for m, e in zip(rps_r_mean, rps_r_err)],
#     [m + 0.5*e for m, e in zip(rps_r_mean, rps_r_err)],
#     alpha=0.5)
plt.plot(conns, [d['mean'] for d in rps_balanced], label='balanced')
plt.xlabel('concurrent connections')
plt.ylabel('requests per second')
plt.grid()
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(conns, [d['mean'] for d in latency_regular], label='regular')
plt.plot(conns, [d['mean'] for d in latency_balanced], label='balanced')
plt.xlabel('concurrent connections')
plt.ylabel('latency (us)')
plt.grid()
plt.legend()

plt.tight_layout()
plt.show()
