
#include <limits.h>
#include <stdio.h>

void printArray(int* nums, int numSize) {
    printf("[");
    for (int i = 0; i < numSize; i++) {
        if (i > 0) {
            printf(", ");
        }
        printf("%d", nums[i]);
    }
    printf("]\n");
}

void recursion(int* nums, int numSize, int target, int* result) {
    //printArray(nums, numSize);
    if (numSize < 3) {
        *result += numSize == 2 ? nums[0] + nums[1] == target ? 1 : 0 : 0;
        //printf("result end %d\n", *result);
        return;
    }
    //printf("Numsize %d, target %d\n", numSize, target);

    int start = nums[0] + nums[1];
    int end = nums[numSize - 1] + nums[numSize - 2];
    int sides = nums[0] + nums[numSize - 1];
    int resultOne, resultTwo, resultThree = 0;

    if (start == target) {
        recursion(nums + 2, numSize - 2, target, &resultOne);
        resultOne += 1; 
    }
    if (end == target) {
        recursion(nums, numSize - 2, target, &resultTwo);
        resultTwo += 1;
    }
    if (sides == target) {
        recursion(nums + 1, numSize - 2, target, &resultThree);
        resultThree += 1;
    } 

    *result += resultOne > resultTwo ? resultOne > resultThree ? resultOne : resultThree : resultTwo > resultThree ? resultTwo : resultThree;
    
    //printf("result %d\n", *result);
}

int maxOperations(int* nums, int numsSize) {
    int resultOne, resultTwo, resultThree = 0;

    int targetStart = nums[0] + nums[1];
    int targetEnd = nums[numsSize - 1] + nums[numsSize - 2];
    int targetSides = nums[0] + nums[numsSize - 1];
    
    recursion(nums + 2, numsSize - 2, targetStart, &resultOne);
    recursion(nums, numsSize - 2, targetEnd, &resultTwo);
    recursion(nums + 1, numsSize - 2, targetSides, &resultThree);

    return 1 + (resultOne > resultTwo ? resultOne > resultThree ? resultOne : resultThree : resultTwo > resultThree ? resultTwo : resultThree);
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    int maxOps = maxOperations(nums, numsSize);
    printf("Max operations: %d\n", maxOps);

    return 0;
}