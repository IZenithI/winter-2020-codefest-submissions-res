using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    //Configuration Parameters
    [Header("Projectile")]
    [SerializeField] GameObject bibleProjectile;
    [SerializeField] [Range(5, 15)] float projectileSpeed = 10f;
    [SerializeField] [Range(0.01f,1)] float projectileFiringPeriod = 0.3f;

    Coroutine throwingCoroutine;
    bool facingRight = true;

    // Update is called once per frame
    void Update()
    {
        GetPlayerFacingDirection();
        ThrowBible();
    }

    private void GetPlayerFacingDirection()
    {
        float moveHorizontal = Input.GetAxisRaw("Horizontal");
        if (moveHorizontal > 0)
            facingRight = true;
        else if (moveHorizontal < 0)
            facingRight = false;
    }

    /* Single Throw vs Continuous Throw
       Currently: Continuous Throw

       If you want single throws, uncomment the comment in 'ThrowBible' and
       delete or comment out every 'Coroutine' line as well as the IEnumerator Function*/


    private void ThrowBible()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            /*GameObject projectile = Instantiate(
                bibleProjectile,
                transform.position,
                Quaternion.identity) as GameObject;

            if(facingRight == true)
                projectile.GetComponent<Rigidbody2D>().velocity = new Vector2(projectileSpeed, 0);
            else if (facingRight == false)
                projectile.GetComponent<Rigidbody2D>().velocity = new Vector2(-projectileSpeed, 0);*/

            throwingCoroutine = StartCoroutine(ThrowContinuously());
        }
        if (Input.GetButtonUp("Fire1"))
        {
            StopCoroutine(throwingCoroutine);
        }
    }

    IEnumerator ThrowContinuously()
    {
        while (true)
        {
            GameObject projectile = Instantiate(
                    bibleProjectile,
                    transform.position,
                    Quaternion.identity) as GameObject;
            if(facingRight == true)
                projectile.GetComponent<Rigidbody2D>().velocity = new Vector2(projectileSpeed, 0);
            else if (facingRight == false)
                projectile.GetComponent<Rigidbody2D>().velocity = new Vector2(-projectileSpeed, 0);
            yield return new WaitForSeconds(projectileFiringPeriod);
        }
    }
}
