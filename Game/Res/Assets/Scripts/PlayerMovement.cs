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
    public Rigidbody2D rb2d;


    void Start()
    {
        //player animation
        spriteRenderer = GetComponent<SpriteRenderer>();
        animator = GetComponent<Animator>();

        //player sprite
        rb2d = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        float moveX = Input.GetAxisRaw("Horizontal") * moveSpeed * Time.deltaTime;
        //float moveY = Input.GetAxisRaw("Vertical") * moveSpeed * Time.deltaTime;
        //transform.Translate(moveX, moveY, 0);
        transform.Translate(moveX, 0, 0);

        animator.SetFloat("speed", Mathf.Abs(moveX));

        if (Input.GetButtonDown("Jump") && grounded == true)
        {
            rb2d.AddForce(new Vector2(0, 10), ForceMode2D.Impulse);
        }

        //Faster drop
        if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
        {
            rb2d.AddForce(new Vector2(0, -10), ForceMode2D.Impulse);
        }

        if (faceR == false && moveX > 0 || faceR == true && moveX < 0)
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
