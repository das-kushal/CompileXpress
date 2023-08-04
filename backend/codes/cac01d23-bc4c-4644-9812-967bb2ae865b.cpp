#include <iostream>
#include <vector>
#include <map>
#include <queue>
#include <set>

using namespace std;

// number of provinces
void countProvinces(int node, vector<int> &vis, vector<vector<int>> &isConnected)
{
    vis[node] = 1;

    for (int i = 0; i < isConnected[0].size(); i++)
    {
        if (!vis[i] and isConnected[node][i])
            countProvinces(i, vis, isConnected);
    }
}

int findCircleNum(vector<vector<int>> &isConnected)
{
    if (isConnected.empty())
        return 0;
    int n = isConnected.size();
    vector<int> vis(n, 0);
    int count = 0;
    for (int i = 0; i < n; i++)
    {
        if (!vis[i])
        {
            count++;
            countProvinces(i, vis, isConnected);
        }
    }

    return count;
}

// rotten oranges -- good
int orangesRotting(vector<vector<int>> &grid)
{
    int n = grid.size();
    int m = grid[0].size();

    queue<pair<pair<int, int>, int>> q; // pos(row,col), time
    int vis[n][m];

    int countFresh = 0;

    for (int i = 0; i < n; ++i)
    {
        for (int j = 0; j < m; j++)
        {
            if (grid[i][j] == 2)
            {
                q.push({{i, j}, 0});
                vis[i][j] = 2;
            }
            else
            {
                vis[i][j] = 0;
            }

            if (grid[i][j] == 1)
                countFresh++;
        }
    }

    int ansTime = 0;

    int count = 0;

    int dRow[] = {0, -1, 1, 0};
    int dCol[] = {1, 0, 0, -1};

    while (!q.empty())
    {
        int row = q.front().first.first;
        int col = q.front().first.second;
        int time = q.front().second;
        ansTime = max(ansTime, time);
        q.pop();

        for (int i = 0; i < 4; ++i)
        {
            int nrow = row + dRow[i];
            int ncol = col + dCol[i];

            if (nrow >= 0 and nrow < n and ncol >= 0 and ncol < m and vis[nrow][ncol] == 0 and grid[nrow][ncol] == 1)
            {
                q.push({{nrow, ncol}, time + 1});
                vis[nrow][ncol] = 2;
                count++; // keep track of the fresh oranges
            }
        }
    }

    if (countFresh != count) // if still some fresh oranges are left untouched then return -1
        return -1;

    return ansTime;
}

// 01 matrix nearest 1 to 0 -- using BFS
vector<vector<int>> updateMatrix(vector<vector<int>> &mat)
{
    int n = mat.size();
    int m = mat[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));
    vector<vector<int>> dist(n, vector<int>(m, 0));

    int drow[4] = {1, 0, -1, 0};
    int dcol[4] = {0, 1, 0, -1};

    queue<pair<pair<int, int>, int>> q; // pos , steps

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (mat[i][j] == 0)
            {
                q.push({{i, j}, 0});
                vis[i][j] = 1;
            }
        }
    }

    while (!q.empty())
    {
        int row = q.front().first.first;
        int col = q.front().first.second;
        int steps = q.front().second;
        q.pop();
        dist[row][col] = steps;

        for (int i = 0; i < 4; i++)
        {
            int nrow = row + drow[i];
            int ncol = col + dcol[i];

            if (nrow >= 0 and nrow < n and ncol >= 0 and ncol < m and vis[nrow][ncol] == 0)
            {
                vis[nrow][ncol] = 1;
                q.push({{nrow, ncol}, steps + 1});
            }
        }
    }

    return dist;
}

void dfsHelp(int row, int col, vector<vector<char>> &board, vector<vector<int>> &vis, int delrow[], int delcol[])
{
    vis[row][col] = 1;

    for (int i = 0; i < 4; i++)
    {
        int nrow = row + delrow[i];
        int ncol = col + delcol[i];

        if (nrow >= 0 and nrow < board.size() and ncol >= 0 and ncol < board[0].size() and !vis[nrow][ncol] and board[nrow][ncol] == 'O')
            dfsHelp(nrow, ncol, board, vis, delrow, delcol);
    }
}

void solve(vector<vector<char>> &board)
{
    int n = board.size();
    int m = board[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));

    int delrow[] = {1, -1, 0, 0};
    int delcol[] = {0, 0, 1, -1};

    // checking to do dfs on the boundary Os
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if ((i * j == 0 or i == n - 1 or j == m - 1) and !vis[i][j] and board[i][j] == 'O')
            {
                dfsHelp(i, j, board, vis, delrow, delcol);
            }
        }
    }

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (!vis[i][j] && board[i][j] == 'O') // if it is not marked visited  by the boundary O and still it is O then convert it to X
                board[i][j] = 'X';
        }
    }
}

// gfg - Number of Distinct Islands
void dfsCount(int row, int col, vector<vector<int>> &grid, int n, int m, vector<vector<int>> &points, vector<vector<int>> &vis, int baseRow, int baseCol)
{
    if (row < 0 or col < 0 or row >= n or col >= m or vis[row][col] or grid[row][col] != 1)
        return;
    vis[row][col] = 1;
    points.push_back({row - baseRow, col - baseCol});
    dfsCount(row + 1, col, grid, n, m, points, vis, baseRow, baseCol);
    dfsCount(row, col + 1, grid, n, m, points, vis, baseRow, baseCol);
    dfsCount(row, col - 1, grid, n, m, points, vis, baseRow, baseCol);
    dfsCount(row - 1, col, grid, n, m, points, vis, baseRow, baseCol);
}
int countDistinctIslands(vector<vector<int>> &grid)
{
    int n = grid.size();
    int m = grid[0].size();

    set<vector<vector<int>>> points;
    vector<vector<int>> vis(n, vector<int>(m, 0));

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (grid[i][j] == 1 and !vis[i][j])
            {

                {
                    vector<vector<int>> temp;
                    dfsCount(i, j, grid, n, m, temp, vis, i, j);
                    points.insert(temp);
                }
            }
        }
    }

    return points.size();
}

int main(int argc, char const *argv[])
{
	cout<<"hello world\n";
    return 0;
}
