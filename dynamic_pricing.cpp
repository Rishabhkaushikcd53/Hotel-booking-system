#include <iostream>
#include <vector>
using namespace std;

class SegmentTree {
    vector<int> tree;
    int n;

    void build(vector<int>& prices, int node, int start, int end) {
        if (start == end) {
            tree[node] = prices[start];
        } else {
            int mid = (start + end) / 2;
            build(prices, 2 * node + 1, start, mid);
            build(prices, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    void update(int node, int start, int end, int idx, int value) {
        if (start == end) {
            tree[node] = value;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) update(2 * node + 1, start, mid, idx, value);
            else update(2 * node + 2, mid + 1, end, idx, value);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, l, r) + query(2 * node + 2, mid + 1, end, l, r);
    }

public:
    SegmentTree(vector<int>& prices) {
        n = prices.size();
        tree.resize(4 * n);
        build(prices, 0, 0, n - 1);
    }

    void updatePrice(int idx, int value) {
        update(0, 0, n - 1, idx, value);
    }

    int getSum(int l, int r) {
        return query(0, 0, n - 1, l, r);
    }
};

int main() {
    vector<int> hotelPrices = {100, 200, 150, 300, 250};
    SegmentTree st(hotelPrices);

    cout << "Total revenue from rooms 1 to 3: " << st.getSum(1, 3) << endl;

    st.updatePrice(2, 180);
    cout << "Updated revenue from rooms 1 to 3: " << st.getSum(1, 3) << endl;

    return 0;
}
