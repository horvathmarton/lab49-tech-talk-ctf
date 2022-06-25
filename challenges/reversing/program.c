#include <stdio.h>
#include <string.h>

int main() {
    char password[100];

    printf("Please enter the password: ");
    scanf("%s", password);
    printf("\n");

    char* flag = "flag{you_are_officially_a_reverse_engineer_now_so_you_are_a_reenigne}";
    if (strcmp(password, flag) == 0) {
        printf("Logged in successfully.\n\n");
        printf("The flag is %s\n\n", flag);
    } else {
        printf("Hey this is not the password.\n\n");
        printf("Your attempt will be reported to the administrators.\n\n");
    }
 
    return 0;
}
