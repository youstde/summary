
// 23. 合并K个升序链表
var mergeKLists = function(lists) {
    if (!lists.length) return null;
    return split(lists, 0, lists.length - 1);
};

var split = function(lists, start, end) {
    if (start === end) return lists[start];

    const mid = parseInt(start + (end - start) / 2);
    const left = split(lists, start, mid);
    const right = split(lists, mid + 1, end);
    return merge(left, right);
}

var merge = function(left, right) {
    const resNode = new ListNode();
    let p1 = left;
    let p2 = right;
    let p = resNode;

    while(p1 !== null &&  p2 !== null) {
        if(p1.val < p2.val) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }
    if (p1 === null && p2 !== null) {
        p.next = p2;
    }
    if (p1 !== null && p2 === null) {
        p.next = p1;
    }
    return resNode;
}