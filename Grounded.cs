using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Grounded : MonoBehaviour
{
    GameObject Player;

    void Start()
    {
        Player = gameObject.transform.parent.gameObject;
    }

    void Update()
    {

    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collsion.collider.tag == "Ground")
        {
            Player.GetComponent<Move2D>().isGrounded = true;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collsion.collider.tag == "Ground")
        {
            Player.GetComponent<Move2D>().isGrounded = false;
        }
    }


}
