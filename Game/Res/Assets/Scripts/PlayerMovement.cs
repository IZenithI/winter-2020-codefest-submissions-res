using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    //player movement
    public float moveSpeed = 10f;
    private bool faceR = true;
    Vector3 movement;
    private bool grounded = true;

    //player animation
    private SpriteRenderer spriteRenderer;
    private Animator animator;
    private Rigidbody2D rb2d;

    //death and respawn and audio
    AudioSource throwProjectileSound;


    void Start()
    {
        //player animation
        spriteRenderer = GetComponent<SpriteRenderer>();
        animator = GetComponent<Animator>();

        //projectile sound
        throwProjectileSound = GetComponent<AudioSource>();
    }

    void Update()
    {
        float moveX = Input.GetAxisRaw("Horizontal") * moveSpeed * Time.deltaTime;
        float moveY = Input.GetAxisRaw("Vertical") * moveSpeed * Time.deltaTime;
        transform.Translate(moveX, moveY, 0);

        animator.SetFloat("Speed", Mathf.Abs(moveX));

        if (Input.GetKeyDown("W") && grounded == true)
        {
            rb2d.AddForce(new Vector2(0, 10), ForceMode2D.Impulse);
        }

        if(faceR == false && moveX > 0 || faceR == true && moveX < 0)
        {
            Flip();
        }
    }

    void Flip()
    {
        faceR = !faceR;
        Vector3 Scaler = transform.localScale;
        Scaler.x *= -1;
        transform.localScale = Scaler;
    }

    private void OnCollisionEnter (Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            grounded = true;
        }
    }

    private void OnCollisionExit(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            grounded = false;
        }
    }


}
