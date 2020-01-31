using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class EnemyMovement : MonoBehaviour
{
    // Movement Variables
    public float speed = 3;
    bool faceR = true;

    private Rigidbody2D rb2d;
    private Transform target;
    private Animator animator;

    // Start is called before the first frame update
    void Start()
    {
        rb2d = GetComponent<Rigidbody2D>();
        target = GameObject.FindGameObjectWithTag("Player").GetComponent<Transform>();
        animator = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        transform.position = Vector2.MoveTowards(transform.position, new Vector2(target.position.x, transform.position.y), speed * Time.deltaTime);
        if (faceR == true && target.position.x < transform.position.x || faceR == false && target.position.x > transform.position.x)
        {
            Flip();
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        //if(collision.name == "Player" || collision.name == "Player(Clone)" || collision.name == "Projectile(Clone)")
        if (collision.name == "Player")
        {
            Destroy(collision.gameObject);
            SceneManager.LoadScene("TitleScreen");
        }
        else if(collision.name == "Projectile(Clone)")
        {
            animator.SetBool("isDead", true);
            Destroy(gameObject);
            Destroy(collision.gameObject);
        }
    }

    void Flip()
    {
        faceR = !faceR;
        Vector3 Scaler = transform.localScale;
        Scaler.x *= -1;
        transform.localScale = Scaler;
    }
}
