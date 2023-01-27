/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
 var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = [];
    for(let i = 0; i <= m; i++) {
        dp[i] = [0];
    }
    for(let j = 1; j <= n; j++) {
        dp[0][j] = 0;
    }
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp;
};
// console.log(longestCommonSubsequence("aabcde", "ace"));

// 712
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
 var minimumDeleteSum = function(s1, s2) {
    const dp = [[0]];
    for(let i = 1; i <= s1.length; i++) {
        dp[i] = [s1.charCodeAt(i - 1)];
    }
    for(let j = 1; j <= s2.length; j++) {
        dp[0][j] = s2.charCodeAt(j - 1);
    }
    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j <= s2.length; j++) {
            if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j] + s1.charCodeAt(i - 1), dp[i][j - 1] + s2.charCodeAt(j - 1));
            }
        }
    }
    return dp;
};
console.log(minimumDeleteSum("delete", "leet"));